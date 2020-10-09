echo "========================COMMENCING BUILD========================"

cd client
echo "***** Installing frontend package dependencies..."
npm install
echo "***** Building React project..."
npm run build
echo "***** Copying React build files to backend public folder..."
cd ../server
mkdir -p public
cp -r ../client/build/* public/
echo "***** Installing backend package dependencies..."
npm install
cd ../

echo "=========================BUILD COMPLETE========================="