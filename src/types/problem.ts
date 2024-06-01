export interface ITag {
    id?: number;
    tagName: string;
    problems?: IProblem[];
}
export interface ITestCase {
    id?: number;
    input: string;
    output: string;
    problemId?: number;
    problem?: IProblem;
    sample: boolean;
  }
  export interface IUser {
    id?: number;
    username?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    profileImageURL?: string;
    password?: string;
    role?: "MEMBER" | "ADMIN";
    isActive?: boolean;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    problemsCreated?: IProblem[];
  }
export interface IProblem {
    id?: number;
    title: string;
    statement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    tags: ITag[];
    difficulty: "Easy" | "Medium" | "Hard";
    testCases?: ITestCase[];
    createdAt?: Date;
    updatedAt?: Date;
    creatorId?: number;
    creator?: IUser;
    isActive: boolean;
    isVerified: boolean
}
export interface ResponseTestCase {
  id: number;
  input: string;
  output: string;
  problemId: number;
  sample: boolean;
  userOutput: string;
  verdict:
      | "Accepted"
      | "Wrong Answer"
      | "Runtime Error"
      | "Time Limit Exceeded"
      | "Compile Error"
      | "Memory Limit Exceed"
      | "Segmentation fault";
}