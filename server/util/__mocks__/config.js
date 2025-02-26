const mockConfig = {
  JWT_SECRET: 'test-secret',
}

export const config = (key) => {
  return mockConfig[key];
}