import { Authenticator, AuthenticatorProps } from "@aws-amplify/ui-react";

const MyAuthenticator: React.FC<AuthenticatorProps> = (props) => {
    return (
        <Authenticator
            formFields={{
                signUp: {
                    email: {
                        order: 1,
                    },
                    name: {
                        order: 2,
                    },
                },
            }}
            {...props}
        />
    );
};

export default MyAuthenticator;