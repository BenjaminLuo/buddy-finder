import React from 'react';
import { TabPanel } from "../../components/UI/TabPanel";

// Tabber for blocked user list
export function blockedList(value, query, UserCard, friends, blocked) {
    return (
        <TabPanel value={value} index={2}>

            {query ? query.map((item, index) => (
                blocked.includes(item.user_id) ?
                    <UserCard
                        key={index}
                        name={item.display_name ? item.display_name : "Anonymous User"}
                        userID={item.user_id}
                        year={item.term ? item.term : ""}
                        program={item.program ? item.program : ""}
                        disabled={item.private}
                        friend={friends.includes(item.user_id)}
                        blocked={true} />
                    : null
            )) : null}

        </TabPanel>
    );
}
