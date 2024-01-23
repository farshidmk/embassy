import { ITimeSpan } from "./timeSpan";

export interface IClasses {
  Created: string;
  CreatedOn: Date;
  class_name: string;
  class_time_span: ITimeSpan;
  uid: string;
}
