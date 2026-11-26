import { Test, TestingModule } from '@nestjs/testing';
import { WebhooksService } from './webhooks.service';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('WebhooksService', () => {
  let service: WebhooksService;
  let query: jest.Mock;

  beforeEach(async () => {
    query = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhooksService,
        { 
          provide: DataSource, 
          useValue: { query } 
        }
      ],
    }).compile();

    service = module.get<WebhooksService>(WebhooksService);
  });

  it('ingests a new event', async() => {
    query.mockResolvedValue([{ id: 'row-id-1' }]);
    const result = await service.ingestWebhookEvent('test-provider', { 
      id: 'event-id-1',
      type: 'booking.created',
    })
    expect(result).toEqual({ duplicated: false })
  });

  it('marks a duplicate when RETURNING is empty', async () => {
    query.mockResolvedValue([]);
    const result = await service.ingestWebhookEvent('test', {
      id: 'evt_1',
      type: 'booking.created',
    });
    expect(result).toEqual({ duplicated: true });
  });

  it('rejects a missing event id without querying', async () => {
    await expect(
      service.ingestWebhookEvent('test', { type: 'booking.created' }),
    ).rejects.toBeInstanceOf(BadRequestException)    
    expect(query).not.toHaveBeenCalled()
  });

  it('rejects an empty event id without querying', async () => {
    await expect(
      service.ingestWebhookEvent('test', { id: '' }),
    ).rejects.toBeInstanceOf(BadRequestException)
    expect(query).not.toHaveBeenCalled();
  });
});
