import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class WebhooksService {
    constructor(private readonly dataSource: DataSource){}

    async ingestWebhookEvent(
        provider: string,
        payload: Record<string, unknown>
    ): Promise<{ duplicated: boolean }> {
        const eventId = payload.id;

        if (typeof eventId !== 'string' || eventId.length === 0) {
            throw new BadRequestException('Missing or invalid event id');
        } 

        const rows: Array<{ id: string }> = await this.dataSource.query(
            `INSERT INTO webhook_events (provider, event_id, payload) 
            VALUES ($1, $2, $3::jsonb)
            ON CONFLICT (provider, event_id) DO NOTHING
            RETURNING id`,
            [provider, eventId, JSON.stringify(payload)]
        );

        return { duplicated: rows.length === 0 };
    }
}
