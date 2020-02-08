import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import styled from ''

class Navbar extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline></CssBaseline>
                <Container maxWidth='xl' disableGutters="true">
                    <Typography component="div" style={{ backgroundColor: 'lightblue', height: '10vh' }}>
                        <StorefrontRoundedIcon fontSize="large" />
                    </Typography>

                </Container>
                <Container maxWidth='xl' disableGutters="true">
                    <Typography component="div" style={{ backgroundColor: 'lightgreen', height: '8vh' }} />
                </Container>
            </React.Fragment>

        )
    }
}

export default Navbar
