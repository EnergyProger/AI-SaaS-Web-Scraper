"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskType } from "@/types/task";
import React from "react";
import TaskMenuButton from "./task-menu-button";

const TaskMenu = () => {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={[
          "interactions",
          "extraction",
          "timing",
          "results",
          "storage",
        ]}
      >
        <AccordionItem value="interactions">
          <AccordionTrigger className="font-bold">
            User interactions
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.FILL_INPUT} />
            <TaskMenuButton taskType={TaskType.CLICK_ELEMENT} />
            <TaskMenuButton taskType={TaskType.NAVIGATE_URL} />
            <TaskMenuButton taskType={TaskType.SCROLL_TO_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuButton taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
            <TaskMenuButton taskType={TaskType.EXTRACT_DATA_WITH_AI} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="storage">
          <AccordionTrigger className="font-bold">
            Data storage
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.READ_PROPERTY_FROM_JSON} />
            <TaskMenuButton taskType={TaskType.ADD_PROPERTY_TO_JSON} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="timing">
          <AccordionTrigger className="font-bold">
            Timing controls
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.WAIT_FOR_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="results">
          <AccordionTrigger className="font-bold">
            Result delivery
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.DELIVER_VIA_WEBHOOK} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default TaskMenu;
