/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiChatService } from './api-chat.service';

describe('Service: ApiChat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiChatService]
    });
  });

  it('should ...', inject([ApiChatService], (service: ApiChatService) => {
    expect(service).toBeTruthy();
  }));
});
