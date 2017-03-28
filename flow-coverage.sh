#! /bin/bash
# 51 should be the branch name

git -C nervecenter reset --hard HEAD
yarn install
git -C nervecenter checkout master
git -C nervecenter reset --hard HEAD
git -C nervecenter pull -f
git -C nervecenter reset --hard HEAD
git -C nervecenter checkout -f $1
git -C nervecenter pull


for i in $(git -C nervecenter --no-pager diff --name-only master src/**/*.js); do
  echo $i >> coverage.txt
  $(npm bin)/flow coverage nervecenter/$i >> coverage.txt
done
