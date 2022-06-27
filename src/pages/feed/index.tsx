import FeedComponent from '../../components/Feed';
import HomeLayout from '../../layout/Home';
import { api } from '../../services/api';

interface Props {
    user: {
        nickname: string;
        profilePicture: string;
    };
    publications: Array<any>;
    groups: Array<any>;
}

const FeedPage = (props: Props): JSX.Element => {
    const { user, publications, groups } = props;

    return (
        <HomeLayout
            child={
                <FeedComponent
                    publications={publications}
                    user={user}
                    groups={groups}
                />
            }
            user={user}
        />
    );
};

export async function getStaticProps(ctx: any) {
    try {
        const publicationsResponse = await api.get('/publication');

        const userDetailsResponse = await api.get('/user');

        const groupsResponse = await api.get('/group');

        const publications = publicationsResponse.data;

        const {
            data: { name: nickname },
        } = userDetailsResponse;

        const { data: groups } = groupsResponse;

        return {
            props: {
                user: {
                    nickname,
                    profilePicture: 'not-profile-picture-icon.svg',
                },
                publications,
                groups,
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}

export default FeedPage;
