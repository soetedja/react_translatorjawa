
echo off
set arg1=%1

copy src\actions\wordTypeActions.js src\actions\%arg1%Actions.js
copy src\reducers\wordTypeReducer.js src\reducers\%arg1%Reducer.js
copy src\routes\wordTypeRoutes.js src\routes\%arg1%Routes.js
mkdir src\views\%arg1%
Xcopy  /E /I  src\views\WordType src\views\%arg1%
rename src\views\%arg1%\WordType.js %arg1%.js
rename src\views\%arg1%\WordTypeForm.js %arg1%Form.js
rename src\views\%arg1%\WordType.test.js %arg1%.test.js
rename src\views\%arg1%\WordTypeForm.test.js %arg1%Form.test.js
