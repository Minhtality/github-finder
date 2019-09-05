import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getRepos(this.props.match.params.login);
    }
    render() {
        // pull out this.props.user
        const {
            email, login, company, avatar_url,
            name, location, bio, blog, html_url, followers,
            following, public_repos, public_gists, hireable } = this.props.user;
        //bring in this.props
        const { loading, repos } = this.props;


        //loading spinner
        if (loading) return <Spinner />
        return (
            <Fragment>
                <Link to="/" className="btn btn-light" >Back to Search</Link>
                Hireable:{''} {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
                <div className="card grid-2">
                    <div className="all-center"> {/*Left card, centered*/}
                        <img src={avatar_url} className="round-img" style={{ width: '150px' }} alt="" />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div> {/*Right Card, normal*/}
                        <h3>Bio</h3>
                        {bio ? <p>{bio}</p> : <p>This user doesn't have a bio yet</p>}
                        {email && <h3>{email}</h3>}
                        <a href={html_url} className="btn btn-dark my-1">{login}'s Github</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website: </strong> {blog}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company: </strong> {company}
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* stat counter */}
                <div className="card text-center">
                    <div className="badge badge-primary">Followers:{followers}</div>
                    <div className="badge badge-success">Following:{following}</div>
                    <div className="badge badge-light">Public Repos:{public_repos}</div>
                    <div className="badge badge-dark">Public Gists:{public_gists}</div>
                </div>
                <div>
                </div>
                <Repos repos={repos} />
            </Fragment>
        )
    }
}

User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired
}

export default User
