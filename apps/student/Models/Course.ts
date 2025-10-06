export type ModuleDto = {
  week: string;
  moduleName: string;
  content: string; // HTML content
};

export type CourseOverview = {
  id: number;
  skillLevel: string;
  duration: string;
};

export type CourseGet = {
  courseName: string;
  description: string;
  courseOverview: CourseOverview;
  moduleDto: ModuleDto[];
};
