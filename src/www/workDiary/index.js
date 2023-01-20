import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import WorkDiary from "./Diary";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";
import ThemeOptions from "../../Layout/ThemeOptions/";

const diary = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`/diary`} component={WorkDiary}/>
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default diary;
