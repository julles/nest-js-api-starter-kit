#!/bin/bash

createMigration(){
  ts-node node_modules/typeorm/cli.js migration:create ./src/database/migrations/$1  
}

migrate(){
  ts-node node_modules/typeorm/cli.js migration:run -d src/database/database.ts
}

createEntity(){
  ts-node node_modules/typeorm/cli.js entity:create "./src/database/entities/$1"
}

createSeeder(){
  CLASS_NAME=$1

  FILE_NAME="./src/database/seeder/executor/${CLASS_NAME,,}.seeder.ts"
  # touch $FILE_NAME

  CONTENT=$(cat <<EOF
import { Injectable } from "@nestjs/common";
import { SeederInterface } from "../seeder.interface";

@Injectable()
export class ${CLASS_NAME}Seeder implements SeederInterface {

  constructor() {}

  public seederName: string = '${CLASS_NAME,,}-seeder';

  async run(): Promise<void> {

  }
}
EOF
)

echo "$CONTENT" > $FILE_NAME

}

seed(){
  ts-node ./src/seeder.ts
}

refresh(){
  ts-node ./src/refresh.ts

  migrate 
  seed
}



if [ $1 == "migration:create" ]; then
  createMigration $2
fi

if [ $1 == "migrate" ]; then 
  migrate
fi

if [ $1 == "entity:create" ]; then 
  createEntity $2
fi

if [ $1 == "seeder:create" ]; then
  createSeeder $2
fi

if [ $1 == "seed" ]; then
  seed
fi

if [ $1 == "migrate:refresh" ]; then
  refresh
fi
