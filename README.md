## Run (Astro)
`cd astro`
`npm install`
`npm run dev`

## Build
`cd astro`
`npm run build`

## Deploy (S3 + CloudFront)

The site at https://jpena.dev is hosted in `s3://jpena-portfolio-hugo`, behind
CloudFront distribution `E1PM39SMSCCPKG` (also serves `www.jpena.dev`).

From the repository root, with the `JPENA_*` variables loaded from your shell:

```sh
AWS_ACCESS_KEY_ID="$JPENA_AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$JPENA_AWS_SECRET_ACCESS_KEY" \
npm --prefix astro run deploy
```

The deploy command builds the site, uploads it to S3, and requests a full CloudFront
cache invalidation. CloudFront may take a few minutes to finish clearing the cache.
Old assets are retained so visitors with cached HTML can still load them.

Standard AWS CLI profiles or environment credentials also work with
`npm --prefix astro run deploy`.
