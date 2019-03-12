
// 'Not Found' page.

import React from 'react'

const PageNotFound = ({ location }) => (
  <div>
    Sorry, the page you requested does not exist: {location.pathname}
  </div>
);


export default PageNotFound
