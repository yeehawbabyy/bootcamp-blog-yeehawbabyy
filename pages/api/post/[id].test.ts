import handle from './[id]';
import prisma from '../../../lib/prisma';

jest.mock('../../../lib/prisma', () => ({
  post: {
    delete: jest.fn(),
  },
}));

describe('API Endpoint: /api/post/[id]', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      method: 'DELETE',
      query: {
        id: 'test-post-id'
      }
    };
    mockRes = {
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a post when DELETE method is used', async () => {
    const mockPost = {
      id: 'test-post-id',
      title: 'Test Post',
      content: 'Test Content'
    };

    (prisma.post.delete as jest.Mock).mockResolvedValueOnce(mockPost);

    await handle(mockReq, mockRes);

    expect(prisma.post.delete).toHaveBeenCalledWith({
      where: { id: 'test-post-id' }
    });
    expect(mockRes.json).toHaveBeenCalledWith(mockPost);
  });

  it('should throw error for non-DELETE methods', async () => {
    mockReq.method = 'GET';

    await expect(handle(mockReq, mockRes)).rejects.toThrow(
      'The HTTP GET method is not supported at this route.'
    );
  });
});