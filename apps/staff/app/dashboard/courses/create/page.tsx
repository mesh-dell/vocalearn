"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { coursesPostAPI } from "@/Services/CourseService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [modules, setModules] = useState([
    { week: "", moduleName: "", content: "" },
  ]);
  const router = useRouter();

  // add new module
  const addModule = () => {
    setModules([...modules, { week: "", moduleName: "", content: "" }]);
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      courseName,
      description,
      courseOverview: {
        skillLevel,
        duration,
      },
      moduleDto: modules,
    };

    const data = await coursesPostAPI(payload);
    if (data) {
      toast.success("Course created successfully!");
      router.push("/dashboard/courses");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 space-y-10">
      <h1 className="text-2xl font-bold">Create New Course</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Details */}
        <div>
          <label className="block font-medium">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Introduction to Java"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="A beginner-friendly Java course..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Skill Level</label>
            <input
              type="text"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Beginner"
            />
          </div>
          <div>
            <label className="block font-medium">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="6 weeks"
            />
          </div>
        </div>

        {/* Course Modules */}
        <h2 className="text-xl font-semibold">Modules</h2>
        {modules.map((module, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg space-y-4 bg-gray-50"
          >
            <div>
              <label className="block font-medium">Week</label>
              <input
                type="text"
                value={module.week}
                onChange={(e) => {
                  const newModules = [...modules];
                  newModules[index].week = e.target.value;
                  setModules(newModules);
                }}
                className="w-full border rounded p-2"
                placeholder="Week 1"
              />
            </div>
            <div>
              <label className="block font-medium">Module Name</label>
              <input
                type="text"
                value={module.moduleName}
                onChange={(e) => {
                  const newModules = [...modules];
                  newModules[index].moduleName = e.target.value;
                  setModules(newModules);
                }}
                className="w-full border rounded p-2"
                placeholder="Welcome to Java"
              />
            </div>
            <div>
              <label className="block font-medium">Content</label>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_API_KEY}
                value={module.content}
                onEditorChange={(content) => {
                  const newModules = [...modules];
                  newModules[index].content = content;
                  setModules(newModules);
                }}
                init={{
                  height: 300,
                  menubar: true,
                  plugins: [
                    "anchor",
                    "autolink",
                    "charmap",
                    "code",
                    "codesample",
                    "emoticons",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                }}
              />
            </div>
          </div>
        ))}

        <Button type="button" onClick={addModule}>
          + Add Module
        </Button>

        <div>
          <Button type="submit" className="mt-4">
            Save Course
          </Button>
        </div>
      </form>
    </div>
  );
}
