import React from 'react';
import { TabPanel } from "../../components/UI/TabPanel";

// Tabber for friend list
export function friendList(value, query, UserCard, friends, blocked) {
    return (
        <TabPanel value={value} index={1}>

            {query ? query.map((item, index) => (
                friends.includes(item.user_id) ?
                    <UserCard
                        key={index}
                        name={item.display_name ? item.display_name : "Anonymous User"}
                        userID={item.user_id}
                        year={item.term ? item.term : ""}
                        program={item.program ? item.program : ""}
                        disabled={item.private}
                        friend={true}
                        blocked={blocked.includes(item.user_id)} />
                    : null
            )) : null}

        </TabPanel>
    );
}
