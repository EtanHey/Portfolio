import {useId} from 'react';
import {motion} from 'framer-motion';

interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    workSpace: string;
    _id: string;
}
interface UserCardProps {
    user: UserInfo;
    handleOpenUser: Function;
}
function UserCard(props: UserCardProps) {
    const {user, handleOpenUser} = props;

    const id = useId();
    return (
        <motion.li
            onClick={() => {
                handleOpenUser(user._id);
            }}
            className='comp-userCard'>
            <fieldset>
                <legend>{`${user.firstName} ${user.lastName}`}</legend>
                <p id={`email` + id}>{user.email}</p>
                <fieldset className='comp-userCard-professional'>
                    <legend>Professional Information</legend>
                    <p>{user.workSpace}</p>
                    <p>{user.position}</p>
                </fieldset>
            </fieldset>
        </motion.li>
    );
}

export default UserCard;
