import { it, describe, vi } from 'vitest';
import request from 'supertest';
import { createOrganizationEndpoint } from '../createOrganization.js';
import app from '../../../server.js';
import { post } from '../../../tests/util/httpRequests.js';
import { getUserById } from '../../../database/user/get-user-by-id.js';
import { createJwt } from '../../../util/authentication.js';
import { createOrganizationSql } from '../../../database/organization/create-organization.js';
vi.mock('../../../database/user/get-user-by-id.js');

vi.mock('../../../util/config.js');
vi.mock('../../../database/organization/create-organization.js');

const mockUser = () => ({
  id: '4c790e86-373a-4f70-a1ab-b001a4fd2dfa',
  email: 'woah@example.com',
  role: 'admin',
  created_at: '2025-02-26T00:14:38.081Z',
  updated_at: '2025-02-26T00:14:38.081Z',
  deleted_at: null
})
const mockOrganization = (mockUserId, mockTitle) => ({
  id: 'c5ffaae2-5200-4362-8cf1-85333688744f',
  title: mockTitle,
  createdAt: '2025-02-26T01:04:31.457Z',
  updatedAt: '2025-02-26T01:04:31.457Z',
  deletedAt: null,
  creatorId: mockUserId
})
const invalidJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1ZjZlM2ZlLTcxMGUtNDQ2OC05NzI5LTBhMzRiZDBlNzRmNiIsImVtYWlsIjoid29haEBleGFtcGxlLmNvbSIsInJvbGwiOiJhZG1pbiIsImNyZWF0ZWRfYXQiOiIyMDI1LTAyLTI1VDIzOjI5OjQ2LjI0MloiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMi0yNVQyMzoyOTo0Ni4yNDJaIiwiZGVsZXRlZF9hdCI6bnVsbCwiaWF0IjoxNzQwNTI3NDY4LCJleHAiOjE3NDA1NjM0Njh9.3YqiUK-fL00_LnTl-0JQFY3IXw2WV_X0de-GO9ZHiEk`;

describe('createOrganization', () => {
  it('should return 401 if user is not authenticated', async () => {
    const response = await post('/api/v1/organization', {
      title: 'Test Organization',
    });
    expect(response.status).toBe(401);
    expect(response.text).toMatchInlineSnapshot(`"Unauthorized"`);
  })
  it('should return 401 for an invalid jwt token', async () => {
    const response = await post('/api/v1/organization', {
      title: 'Test Organization',
    }, invalidJwt);
    expect(response.status).toBe(401);
    expect(response.text).toMatchInlineSnapshot(`"Unauthorized"`);
  });
  it('should return 400 if a title is not provided', async () => {
    getUserById.mockResolvedValue(mockUser());
    const response = await post('/api/v1/organization', {
    }, createJwt(mockUser()));
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toMatchInlineSnapshot(`
      [
        {
          "errors": {
            "issues": [
              {
                "code": "invalid_type",
                "expected": "string",
                "message": "Required",
                "path": [
                  "title",
                ],
                "received": "undefined",
              },
            ],
            "name": "ZodError",
          },
          "type": "Body",
        },
      ]
    `);
  })
  it('should return 400 if a title is less than 3 characters', async () => {
    getUserById.mockResolvedValue(mockUser());
    const response = await post('/api/v1/organization', {
      title: 'ab',
    }, createJwt(mockUser()));
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toMatchInlineSnapshot(`
      [
        {
          "errors": {
            "issues": [
              {
                "code": "too_small",
                "exact": false,
                "inclusive": true,
                "message": "String must contain at least 3 character(s)",
                "minimum": 3,
                "path": [
                  "title",
                ],
                "type": "string",
              },
            ],
            "name": "ZodError",
          },
          "type": "Body",
        },
      ]
    `)
  })
  it('should create an organization', async () => {
    getUserById.mockResolvedValue(mockUser());
    createOrganizationSql.mockResolvedValue(mockOrganization(mockUser().id, 'some organization'));

    const response = await post('/api/v1/organization', {
      title: 'some organization',
    }, createJwt(mockUser()));
    expect(response.status).toBe(201);
    expect(response.body).toMatchInlineSnapshot(`
      {
        "createdAt": "2025-02-26T01:04:31.457Z",
        "creatorId": "4c790e86-373a-4f70-a1ab-b001a4fd2dfa",
        "deletedAt": null,
        "id": "c5ffaae2-5200-4362-8cf1-85333688744f",
        "title": "some organization",
        "updatedAt": "2025-02-26T01:04:31.457Z",
      }
    `)
  })
});