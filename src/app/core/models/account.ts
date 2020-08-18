import { IDbFlowAccount, IDbAccountConfiguration } from 'src/app/data/interfaces/models';

export class DbFlowAccount implements IDbFlowAccount {
    constructor(
      public username: string,
      public firstName: string,
      public lastName: string,
      public enabled: boolean,
      public email: string,
      public authorities: string[],
      public imageUrl: string
    ) {}
  }

export class DbAccountConfiguration implements IDbAccountConfiguration {
    constructor(
      public myBackgroundColor: string,
      public otherBackgoundColor: string,
    ) {}
  }
