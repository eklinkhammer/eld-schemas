# Description
Shared data models between findatruck backend services

# Deploying
```
git add --all
git commit -m "feat: add NewSchema"

# choose patch / minor / major
npm version minor -m "chore: release"

npm login
npm publish --access public
git push && git push --tags
```
