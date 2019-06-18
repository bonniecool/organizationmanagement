import React from "react";
import { EmptyStatesList } from "./Icons";

export const EmptyStates = () => (
  <div className="d-flex align-content-center justify-content-center h-100">
    <div className="text-center empty-state no-content my-auto">
      <EmptyStatesList />
      <h3 className="empty-state-title">No Record Found</h3>
    </div>
  </div>
);
