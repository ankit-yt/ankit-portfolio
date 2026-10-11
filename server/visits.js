const COOKIE = 'portfolio_visit';
export function createVisitsHandler(getCollection) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'private, no-store');
    if (!['GET', 'POST'].includes(req.method)) {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }
    if (req.method === 'POST') {
      const origin = req.headers.origin;
      try {
        if ((origin && new URL(origin).host !== req.headers.host) || req.headers['sec-fetch-site'] === 'cross-site') {
          return res.status(403).json({ error: 'Cross-site request rejected' });
        }
      } catch {
        return res.status(403).json({ error: 'Invalid origin' });
      }
    }
    try {
      const collection = await getCollection();
      const counted = (req.headers.cookie || '').split(';').some(value => value.trim() === `${COOKIE}=1`);
      let document;
      if (req.method === 'POST' && !counted) {
        const update = { $inc: { total: 1 }, $set: { updatedAt: new Date() } };
        try {
          document = await collection.findOneAndUpdate({ _id: 'visits' }, update, { upsert: true, returnDocument: 'after' });
        } catch (error) {
          // Two first visits may race to create the single counter document.
          if (error.code !== 11000) throw error;
          document = await collection.findOneAndUpdate({ _id: 'visits' }, update, { returnDocument: 'after' });
        }
        const secure = process.env.VERCEL || req.headers['x-forwarded-proto'] === 'https';
        res.setHeader('Set-Cookie', `${COOKIE}=1; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`);
      } else {
        document = await collection.findOne({ _id: 'visits' });
      }
      return res.status(200).json({ total: document?.total || 0 });
    } catch {
      // Never return database errors or the connection string to the browser.
      return res.status(503).json({ error: 'Visit count temporarily unavailable' });
    }
  };
}
