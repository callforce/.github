#!/bin/bash -e

echo "[$(date +"%Y-%m-%d %T.%3N %Z")] [INFO] executing release.sh"
# REF=
# RELEASE_AS=
# PRERELEASE=
# GIT_TAG_PREVIOUS=
# GREN_GITHUB_TOKEN=
if [ "$GIT_TAG_PREVIOUS" == "" ]; then GIT_TAG_PREVIOUS=$(git describe --abbrev=0 --tags); fi

echo "[$(date +"%Y-%m-%d %T.%3N %Z")] [INFO] updating git config"
if [ "$(git config user.email)" == "" ] 
then 
  git config user.email $GIT_USER_EMAIL
fi
if [ "$(git config user.name)" == "" ]
then 
  git config user.name $GIT_USER_NAME
fi

echo "[$(date +"%Y-%m-%d %T.%3N %Z")] [INFO] updating package version in README.md"
[ "$RELEASE_AS" != "" ] && FLAG_RELEASE_AS="--release-as $RELEASE_AS" || FLAG_RELEASE_AS=""
[ "$PRERELEASE" != "" ] && FLAG_PRERELEASE="--prerelease $PRERELEASE" || FLAG_PRERELEASE=""
UPDATE_MESSAGE=$(./node_modules/.bin/standard-version $FLAG_RELEASE_AS $FLAG_PRERELEASE --dry-run | grep "bumping version in package.json from")
IFS=' ' read -ra UPDATE_MESSAGE_ARRAY <<< "$UPDATE_MESSAGE"
VERSION_PREVIOUS=v${UPDATE_MESSAGE_ARRAY[6]}
VERSION_NEW=v${UPDATE_MESSAGE_ARRAY[8]}
VERSION_NEW_BADGE="${VERSION_NEW//-/--}"  
sed "s/$VERSION_PREVIOUS/$VERSION_NEW/g" README.md > README.md.new
sed "s/-$VERSION_PREVIOUS-/-$VERSION_NEW_BADGE-/g" README.md.new > README.md
rm README.md.new
git add README.md
git commit -m "docs: update version in readme to $VERSION_NEW"

echo "[$(date +"%Y-%m-%d %T.%3N %Z")] [INFO] bumping version and updating change log"
standard-version $FLAG_RELEASE_AS $FLAG_PRERELEASE

echo "[$(date +"%Y-%m-%d %T.%3N %Z")] [INFO] pushing latest changes"
git push --follow-tags origin $REF

echo "[$(date +"%Y-%m-%d %T.%3N %Z")] [INFO] generating release"
GIT_TAG_LATEST=$(git describe --abbrev=0 --tags)
echo GIT_TAG_PREVIOUS=$GIT_TAG_PREVIOUS
echo GIT_TAG_LATEST=$GIT_TAG_LATEST
gren release -t $GIT_TAG_LATEST..$GIT_TAG_PREVIOUS --override
