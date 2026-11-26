import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
    constructor(private readonly webhooksService: WebhooksService){}

    @Post(':provider')
    @HttpCode(200)
    async receiveWebhook(
        @Param('provider') provider: string,
        @Body() body: Record<string, unknown>,
    ) {
        const { duplicated } = await this.webhooksService.ingestWebhookEvent(provider, body);
        return { status: duplicated ? 'duplicated' : 'success' };
    }
}
