/**
 * ActionButtons component
 */

import React, { useCallback, useEffect, useState } from 'react';
import ActionButton from './ActionButton.jsx';
import ClayButton from '@clayui/button';

/**
 * generateUrl: Generates the URL for the action.
 * @param {*} erc External reference code.
 * @param {*} action The action to perform.
 * @returns The URL.
 */
const generateUrl = (erc, action) => {
    var url = 'o/c/bootcamprequests/by-external-reference-code/' + erc + '/object-actions/' + action;

    return url;
};


/**
 * PendingButtons: Implements the approve and deny buttons for pending registrations.
 * @param {*} data The data object.
 * @param {*} onUpdateStatus The method to call when the status should be updated.
 * @returns 
 */
const PendingButtons = ({ data, onUpdateStatus}) => (
    <>
        {data["actions"]["denyRegistration"] && <ActionButton url={generateUrl(data["externalReferenceCode"], "denyRegistration")} 
            onUpdateStatus={onUpdateStatus} displayType="secondary" label="Deny" />}
        {data["actions"]["approveRegistration"] && <ActionButton url={generateUrl(data["externalReferenceCode"], "approveRegistration")} 
            onUpdateStatus={onUpdateStatus} displayType="primary" label="Approve" />}
    </>
);

/**
 * ApprovedButton: Implements the deny button for registered registrations.
 * @param {*} data The data object.
 * @param {*} onUpdateStatus The method to call when the status should be updated.
 * @returns 
 */
const ApprovedButton = ({ data, onUpdateStatus }) => (
    <>
        {data["actions"]["denyRegistration"] && <ActionButton url={generateUrl(data["externalReferenceCode"], "denyRegistration")} 
            onUpdateStatus={onUpdateStatus} displayType="secondary" label="Deny" />}
    </>
);
  
/**
 * DeniedButton: Implements the approve button for denied registrations.
 * @param {*} data The data object.
 * @param {*} onUpdateStatus The method to call when the status should be updated.
 * @returns 
 */
const DeniedButton = ({ data, onUpdateStatus}) => (
    <>
        {data["actions"]["approveRegistration"] && <ActionButton url={generateUrl(data["externalReferenceCode"], "approveRegistration")} 
            onUpdateStatus={onUpdateStatus} displayType="primary" label="Approve" />}
    </>
);
  
/**
 * BackToListButtons: Implements the back to list button and the subsequent admin buttons.
 * @param {*} data The data object.
 * @param {*} onUpdateStatus The method to call when the status should be updated.
 * @param {*} admin The admin flag.
 * @param {*} onBackToList The method to call when the user wants to go back to the list.
 */
const BackToListButtons = ({ data, onUpdateStatus, admin, onBackToList }) => (
    <ClayButton.Group>
        <ActionButton url={null} displayType="primary" label="Back to List" onUpdateStatus={onBackToList} />
        {admin && data && data["registrationStatus"] && (
            <>
                {data["registrationStatus"]["key"] === 'Pending' && <PendingButtons data={data} onUpdateStatus={onUpdateStatus} />}
                {data["registrationStatus"]["key"] === 'Approved' && <ApprovedButton data={data} onUpdateStatus={onUpdateStatus} />}
                {data["registrationStatus"]["key"] === 'Denied' && <DeniedButton data={data} onUpdateStatus={onUpdateStatus} />}
            </>
        )}
    </ClayButton.Group>
);

  
/**
 * ActionButtons: Implements the approve and deny buttons.
 * @param data The data object.
 * @param onUpdateStatus The method to call when the status is updated.
 * @param onBackToList The method to call when the user wants to go back to the list.
 * @param admin The admin flag.
 */
const ActionButtons = ({ data, onUpdateStatus, onBackToList = null, admin = false }) => {
    if (onBackToList) {
        // Always show Back To List and optionally other buttons based on admin status
        return <BackToListButtons data={data} onUpdateStatus={onUpdateStatus} admin={admin} onBackToList={onBackToList} />;
    }

    if (!admin) {
        // If admin is false, render no buttons
        return null;
    }

    // Handle button rendering based on registrationStatus
    if (data && data["registrationStatus"] && data["registrationStatus"]["key"]) {
        switch (data["registrationStatus"]["key"]) {
            case 'Pending':
                return <ClayButton.Group><PendingButtons data={data} onUpdateStatus={onUpdateStatus} /></ClayButton.Group>;
            case 'Approved':
                return <ApprovedButton data={data} onUpdateStatus={onUpdateStatus} />;
            case 'Denied':
                return <DeniedButton data={data} onUpdateStatus={onUpdateStatus} />;
        }
    }

    // Render nothing if the status is unknown or not handled
    return null;
};

export default ActionButtons;
