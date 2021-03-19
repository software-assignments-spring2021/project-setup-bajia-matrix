import React from 'react';

import classes from './Spinner.module.css';

/*
    This component renders a spinning animation when a page
    is performing side effects before it renders. For example,
    if a component is fetching data from an API with useEffect,
    this spinner will display until the fetch is completed.

    Props:
        This component does not accept any custom props
*/

const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;