## License
https://reza.mit-license.org/

# Nest JS API Starter Kit

This repository is a Nest.js starter kit that comes with PostgreSQL and TypeORM by default. It also includes migration and seeder features to help you manage your database schema and data.

## Installation

Clone this repository:
```
git clone https://github.com/julles/nest-js-api-starter-kit.git yourproject && cd yourproject
```
Copy .env.example to .env, and fill in all the values as needed.

Run the following command to install dependencies:
```
npm install
```

Grant execute permission to the rez.sh file by running:

```
chmod +x rez.sh
```

## Using Migrations

To create a migration file, run the following command:

```
./rez.sh migration:create create_your_awesome_table
```

This will generate a migration file in the **/src/database/migrations** directory. The generated migration file is a TypeORM migration file.

After the migration file is generated, you can add tables or queries as needed. 

To execute the migration, run the following command:

```
./rez.sh migrate
```

## Using Seeder

To create a seeder file, run the following command:

```
./rez.sh seeder:create MyAwesomeSeeder
```

This will generate a seeder file in the **/src/database/seeder/executor/** directory.

Before running the seeder, you need to register your seeder class in the following files:

1. seeder.module in the providers array
2. seeder.service and inject it into the constructor
3. Register the seeder property in the register method

In **seeder.service.ts**:

``` ts
export class SeederService {
  constructor(
    @InjectRepository(SeederEntity) private seederRepository: Repository<SeederEntity>,
    private readonly testingSeeder: TestingSeeder
  ) {}
}
```

Then register in the register method:
``` ts
registers(): SeederInterface[] {
    return [
      this.testingSeeder
    ];
  }
```

To run the seeder, run the following command:

```
./rez.sh seed
```

To refresh your database, you can also run:

```
./rez.sh migrate:refresh
```

## Entities

To generate an entity, run the following command:

```
./rez.sh entity:create YourEntity

```

This will generate an entity file in the **/src/database/entities/** directory.


