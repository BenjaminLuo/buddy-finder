import React from 'react';
import { TabPanel } from "../../components/UI/TabPanel";

// Tabber for list of all users
export function userList(value, query, UserCard, friends, blocked) {
    return (
        <TabPanel value={value} index={0}>

            {query ? query.map((item, index) => (
                item.searchable ?
                    <UserCard
                        key={index}
                        name={item.display_name ? item.display_name : "Anonymous User"}
                        userID={item.user_id}
                        year={item.term ? item.term : ""}
                        program={item.program ? item.program : ""}
                        disabled={item.private}
                        friend={friends.includes(item.user_id)}
                        blocked={blocked.includes(item.user_id)} />
                    : null
            )) : null}

        </TabPanel>
    );
}
