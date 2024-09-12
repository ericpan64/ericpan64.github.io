#!/bin/bash
cd app
npm i
npm run build
cp -r build/* ..
cd ..