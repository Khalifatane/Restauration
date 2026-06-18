# Production Readiness Checklist

## Code Quality
- [x] No Saleor references (grep -r "saleor" src/)
- [x] No console.log in production code
- [x] No TypeScript errors (tsc --noEmit)

## Performance
- [x] Sanity CDN enabled
- [ ] Images optimized
- [ ] Bundle size under 200kb (analyze)

## Security
- [ ] PayTech keys in env, not code
- [ ] API routes rate-limited
- [ ] CORS configured properly

## User Experience
- [ ] Mobile money instructions clear
- [ ] Loading states everywhere
- [ ] Error messages in French
- [ ] CFA currency formatting

## Business Logic
- [ ] Tax calculation correct (TVA 18%)
- [ ] Shipping rates accurate
- [ ] Order confirmation WhatsApp works
