import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWebhookEvents1795578533578 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE webhook_events (
                id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
                provider    text        NOT NULL,
                event_id    text        NOT NULL,
                payload     jsonb       NOT NULL,
                received_at timestamptz NOT NULL DEFAULT now(),
                CONSTRAINT uq_webhook_events_provider_event_id UNIQUE (provider, event_id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE webhook_events
        `);
    }

}
