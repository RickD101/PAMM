echo "========================COMMENCING BUILD========================"

cd frontend
echo "***** Installing frontend package dependencies..."
npm install
echo "***** Building React project..."
npm run build
echo "***** Copying React build files to backend public folder..."
cd ../backend
mkdir -p public
cp -r ../frontend/build/* public/
echo "***** Installing backend package dependencies..."
npm install
cd ../

echo "=========================BUILD COMPLETE========================="