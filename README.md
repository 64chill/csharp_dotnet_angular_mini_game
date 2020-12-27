# csharp_dotnet_angular_mini_game
# c# basic CRUD webapi with angular as frontend

## packages used:
	- dotnet add package Microsoft.EntityFrameworkCore
	- dotnet add package Microsoft.EntityFrameworkCore.Design
	- dotnet add package Microsoft.EntityFrameworkCore.SqlServer
	- dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection --version 8.1.0

## tools:
	- dotnet tool install --global dotnet-ef

## Make sure to have these installed
	- https://www.microsoft.com/en-us/sql-server/sql-server-downloads
	- https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15
	- https://dotnet.microsoft.com/download/dotnet/5.0

Basic game where you pair the values that match.

The aim is to pair values from the right column with the left column.

2 types of accounts:
 - admin
 - user

admin has the ability to create, delete and edit Games ( the meaning of 1 Game means the name of the game with its pairs)

both types of accounts can play a game

Users can register, login to the app

For angular, things used: bootsrap/jquery (import done via link and script tags - not as components)

C# - there are 3 "microservices" represented by 1 single API. Each of them have its own table in the same DB (or they can each work with separated DBs)

Each microservice runs on its own port, ports can be changed in Properties/launchSettings.json
For now since in testing phase CORS are enabled for everyone... not the best thing when putting it in production, should restrict usage then.

## How to start?
---
	Go to `appsettings.json` and set your DB connection string in `DatabaseConnection`
	Go to each microservice and generate migration files like this : `dotnet ef migrations add initialMigration`
	after do : `dotnet ef database update`

When everything is connected you can click on START.bat, this file will run on windows and will issue `dotnet run` and `ng serve` commands so that you don't have to do them manually.

After this because C# APIs (microservices) work on https port and since they are running locally without having a valid certificate your browser won't allow you nor angular client to connect. In order to fix this issue you will have to firstly try to go to each microservice typing localhost:PORT with https. And allow the https connection. As of the way they are now set that should be the following
 - https://localhost:5101/
 - https://localhost:5201/
 - https://localhost:5301/

Also swagger is enabled so by going here you can see available API endpoints and play with them as well:
 - https://localhost:5101/swagger/index.html
 - https://localhost:5201/swagger/index.html
 - https://localhost:5301/swagger/index.html

 For now when you create the new account via angular it is set to be USER type by default.
 If you want to have admin account you will have to manually add the user with ADMIN type in the databse or do it via swagger...