import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Flex, Text, Wrapper } from '../styled-components';
import { login } from '../../services/auth';

const Base = styled.div`
    flex: 1;
    height: 100vh;
`

const styles = () => ({
    input: {
        marginBottom: "25px",
        '&:after': {
            borderBottom:'2px solid rgb(254, 74, 86)',
        },
    },
    button: {
        color: "white",
        backgroundColor: "rgb(254, 74, 86)",
        marginTop: "45px",
        float: "right",
        width: "50%",
        '&:hover': {
            backgroundColor: "rgb(254, 44, 66)",
        }
    },
    back: {
        color: "rgb(254, 74, 86)",
        marginTop: "5px",
        marginLeft: "auto",
        width: "50%",
        '&:hover': {
            backgroundColor: "white",
        }
    }
});

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { classes } = props;

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }
    
    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await login(username, password);

        if (res && !res.data) {
            setError(res.message);
            return;
        }

        if (res.data && res.data.error) {
            setError(res.data.message);
            return;
        }

        if (res.data && res.data.token) {
            props.login(res.data.token);
            props.history.push('/');
        }
    }

    return (
        <Base>
            <Wrapper>
                <Flex direction="column" justify="center">
                    <Text size="1.8rem" bottom="10px">Login</Text>
                    <Text bottom="60px">Don't have an account? 
                    <Link to="/register/" style={{textDecoration: "none", color: "rgb(254, 44, 66)"}}> Create a new account.</Link></Text>
                    
                    <form onSubmit={onSubmit}>
                        <Input placeholder="Username" fullWidth className={classes.input} value={username} onChange={changeUsername} />
                        <Input placeholder="Password" fullWidth type="password" className={classes.input} value={password} onChange={changePassword} />
                        
                        <Text size=".9rem" align="center" color="rgb(254, 44, 66)" visibility={error ? "visible" : "hidden"}>
                            {error ? error : "error"}
                        </Text>

                        <Button variant="contained" className={classes.button} type="submit">
                            Login
                        </Button>
                    </form>

                    <Button className={classes.back} type="button">
                        <Link to="/" style={{textDecoration: "none", color: "rgb(254, 44, 66)"}}>
                            Back
                        </Link>
                    </Button>

                </Flex>
            </Wrapper>
        </Base>
    )
};

const mapDispatchToProps = (dispatch) => {
    return { login: (token) => { dispatch({ type: "LOG_IN", token }) } }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter (withStyles (styles) (connect (null, mapDispatchToProps) (LoginForm)));