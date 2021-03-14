import {
  Table,
  Scopes,
  Model,
  Column,
  AllowNull,
  HasMany,
  DataType,
  Unique,
  BeforeCreate,
  BeforeBulkCreate,
  BeforeUpdate,
  BeforeBulkUpdate,
  DefaultScope,
} from "sequelize-typescript";
import bcrypt from "bcrypt";

import Fcp from "./fcp";
import Ttfb from "./ttfb";
import DomLoad from "./domLoad";
import WindowLoad from "./windowLoad";
import File from "./file";
import { AssociationOptions, AssociationScope } from "sequelize";

function capitalizeFirstLetterEachWord(string: string): string {
  if (string.split(" ").length > 1) {
    return string
      .split(" ")
      .map(capitalizeFirstLetterEachWord)
      .join(" ");
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

interface AssociationOptionsHasMany extends AssociationOptions {
  scope?: AssociationScope;
}

@DefaultScope({
  attributes: { exclude: ["password"] },
})
@Scopes({
  withPassword: {
    attributes: {
      include: ["password"],
    },
  },
})
@Table
export default class App extends Model<App> {
  @AllowNull(false)
  @Column(DataType.STRING)
  appName: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  set appCode(value: string) {
    this.setDataValue("appCode", value.toLowerCase());
  }
  get appCode(): string {
    return this.getDataValue("appCode");
  }

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @BeforeCreate
  @BeforeBulkCreate
  public static createHash(instance: App) {
    return bcrypt
      .hash(instance.password, 10)
      .then((hash) => {
        instance.password = hash;
      })
      .catch((err) => {
        throw new Error("Could not hash.");
      });
  }

  @BeforeBulkUpdate
  @BeforeUpdate
  public static updateHash({
    attributes,
  }: {
    attributes: { password?: string };
  }) {
    if (attributes.password) {
      return bcrypt
        .hash(attributes.password, 10)
        .then((hash) => {
          attributes.password = hash;
        })
        .catch((err) => {
          throw new Error("Could not hash.");
        });
    }
    return Promise.resolve();
  }

  @BeforeCreate
  @BeforeBulkCreate
  @BeforeUpdate
  @BeforeBulkUpdate
  public static fixCase(instance: App) {
    instance.appName = capitalizeFirstLetterEachWord(instance.appName);
  }

  @HasMany(() => Fcp, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade",
  } as AssociationOptionsHasMany)
  fcps: Fcp[];

  @HasMany(() => Ttfb, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade",
  } as AssociationOptionsHasMany)
  ttfbs: Ttfb[];

  @HasMany(() => DomLoad, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade",
  } as AssociationOptionsHasMany)
  domLoads: DomLoad[];

  @HasMany(() => WindowLoad, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade",
  } as AssociationOptionsHasMany)
  windowLoads: WindowLoad[];

  @HasMany(() => File, {
    foreignKey: "ofId",
    constraints: false,
    onDelete: "cascade",
  } as AssociationOptionsHasMany)
  files: File[];
}
