"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assignmentsPostApi } from "@/Services/AssignmentService";
import { toast } from "react-toastify";
import { useAuth } from "@/Context/useAuth";
import { useRouter } from "next/navigation";

type QuestionType = "OPEN_ENDED" | "CLOSE_ENDED";

type Question = {
  questionText: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string;
  marks: number;
};

type AssignmentForm = {
  title: string;
  description: string;
  dueDate: string;
  classes: string[];
  questions: Question[];
};

export default function CreateAssignmentPage() {
  const router = useRouter();
  const { register, handleSubmit, control, watch } = useForm<AssignmentForm>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      classes: [],
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const { token } = useAuth();

  if (!token) {
    return <div>Please log in to create assignments.</div>;
  }

  const onSubmit = async (data: AssignmentForm) => {
    const res = await assignmentsPostApi(data, token);
    if (res) {
      toast.success("Assignment created successfully!");
      router.push("/dashboard/assignments");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Create Assignment
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Assignment Info */}
        <Card>
          <CardContent className="space-y-4 p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignment Title
              </label>
              <Input
                {...register("title")}
                placeholder="Enter assignment title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                {...register("description")}
                placeholder="Enter assignment description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <Input type="datetime-local" {...register("dueDate")} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <Input {...register("classes.0")} placeholder="e.g., CS2022" />
            </div>
          </CardContent>
        </Card>

        {/* Questions Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Questions</h2>
          {fields.map((field, index) => {
            const questionType = watch(`questions.${index}.type`); // ✅ live update

            return (
              <Card key={field.id}>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Text
                    </label>
                    <Textarea
                      {...register(`questions.${index}.questionText` as const)}
                      placeholder="Enter question text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Type
                    </label>
                    <Controller
                      control={control}
                      name={`questions.${index}.type` as const}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Question Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="OPEN_ENDED">
                              Open Ended
                            </SelectItem>
                            <SelectItem value="CLOSE_ENDED">
                              Close Ended
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* ✅ Now updates in realtime */}
                  {questionType === "CLOSE_ENDED" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options
                      </label>
                      <div className="space-y-2">
                        {[0, 1, 2, 3].map((optIdx) => (
                          <Input
                            key={optIdx}
                            {...register(
                              `questions.${index}.options.${optIdx}` as const
                            )}
                            placeholder={`Option ${optIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correct Answer
                    </label>
                    <Input
                      {...register(`questions.${index}.correctAnswer` as const)}
                      placeholder="Correct answer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marks
                    </label>
                    <Input
                      type="number"
                      {...register(`questions.${index}.marks` as const, {
                        valueAsNumber: true,
                      })}
                      placeholder="Marks"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove Question
                  </Button>
                </CardContent>
              </Card>
            );
          })}

          <Button
            type="button"
            onClick={() =>
              append({
                questionText: "",
                type: "OPEN_ENDED",
                options: [],
                correctAnswer: "",
                marks: 0,
              })
            }
          >
            + Add Question
          </Button>
        </div>

        <Button
          type="submit"
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          Save Assignment
        </Button>
      </form>
    </div>
  );
}
