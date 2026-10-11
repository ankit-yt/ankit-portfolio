# Portfolio visit counter

The footer reads a persistent total from `api/visits.js`, a Vercel Node.js function. The MongoDB driver is used only on the server. No Express server is needed.

## Connect MongoDB Atlas

1. Create an Atlas cluster and a database user with `readWrite` access to the `portfolio` database. Use a dedicated user and a strong password.
2. In Atlas, select **Connect → Drivers → Node.js** and copy the connection URI. Replace the username/password placeholders; URL-encode special characters in credentials.
3. Configure Atlas **Network Access** so the Vercel function can reach the cluster. Use your Vercel static outbound IPs if available. If your deployment uses dynamic outbound IPs, Atlas's `0.0.0.0/0` rule allows connections from anywhere: use it only with strong credentials and the dedicated database user. Your local IP alone will not allow deployed functions to connect.
4. In Vercel **Project → Settings → Environment Variables**, add:

   ```text
   MONGODB_URI=<your Atlas connection URI>
   MONGODB_DB=portfolio
   ```

   Set these for Production. If you enable Preview, use a separate preview database such as `portfolio_preview` so test visits do not affect production.

5. Redeploy. MongoDB creates the `stats` collection and its single `visits` document on the first successful visit. The footer then displays the total. `GET /api/visits` reads it without incrementing it.

Never use a `VITE_` prefix for these secrets or paste credentials into source code. `.env` files are ignored; `.env.example` contains placeholders only.

Use Node.js 22 or newer in Vercel Project Settings for the installed MongoDB driver.

## Local development

`npm run dev` serves only Vite; it does not run the Vercel API. The counter gracefully remains hidden when the endpoint is unavailable. To test both together, install/use the Vercel CLI, link the intended project, run `vercel env pull .env.local`, then `vercel dev`. Keep local environment values pointed at a test database.

## Counting rules

- A browser visit sends one POST request on app mount. React StrictMode shares that request rather than recording it twice.
- A successful new visit atomically increments the total and sets an HttpOnly, SameSite cookie for 24 hours. Ordinary refreshes during that period read the total without incrementing it.
- This is an approximate visit count, not a count of identifiable people. Clearing cookies, different browsers, concurrent first loads, and bots can increase it. Public clients can call the endpoint; this minimal counter does not provide robust bot protection.
- MongoDB stores only `_id`, `total`, and `updatedAt`. There are no IP addresses, user profiles, or per-visitor records in the database.
- The total starts at zero at setup; it cannot reconstruct historical visits. It has no automatic 30-day expiry and persists across Vercel deployments while the Atlas database is retained.
- When the database/API is unavailable the footer hides the count; the rest of the portfolio remains usable.

## Validation

Run `node --test tests/visits.test.js` and `npm run build`. The tests exercise handler behavior with a mock collection; a live Atlas connection still needs verification after configuration.

References: [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js), [MongoDB connection reuse](https://www.mongodb.com/docs/drivers/node-frameworks/next-integration/).
