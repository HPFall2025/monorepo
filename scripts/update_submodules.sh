#!/bin/bash

cd Backend && git fetch && git checkout main && git pull && cd ..
cd Frontend && git fetch && git checkout main && git pull && cd ..
git add Frontend Backend
git commit -m ":hammer: Bump submodules"
git push
