import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { checkPropTypes } from 'prop-types';
import CollectionsPage from './Modal_Form.js';
import 'antd/dist/antd.css';
import './main.css';
import Table from 'antd/lib/table/Table';
import Column from 'antd/lib/table/Column';
import Sider from 'antd/lib/layout';
import Content from 'antd/lib/layout';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import { Row, Col } from 'antd';

class Profile extends Component {
    constructor(props) {
        super(props);
        let user_info = props.location.state;
        console.log(user_info);
        this.state = {
            name: user_info.name,
            id: user_info._id,
            data_source: user_info.medications
        };

        fetch(
            "https://hackthenorth2019.herokuapp.com/api/profile/" + this.state.id
        ).then(response => {
              console.log('response', response);
              response.json().then(
                  data => {
                    this.setState({ data_source: data.medications });
                  }
              )
           }
        );
        var handleDecrement = function (id) {
            fetch(
                "https://hackthenorth2019.herokuapp.com/api/decrement-dosage" + id
            ).then(response =>
                response.json().then(data => {
                    let id_list = data.data_source.id;
                    id_list[id_list.find(id)] = id - 1;
                    this.state.data_source.id = id_list;
                }));
        }

    }
    fetchTableProps (id) {
        fetch(
            "https://hackthenorth2019.herokuapp.com/api/profile/" + id
        ).then(response => {
              console.log('response', response);
              response.json().then(
                  data => {
                      if (data) {
                          this.setState({ data_source: data.medications });
                      }
                  }
              )
           }
        );
    }


    render() {
        return (
                <Row type="flex" justify="center">
                    <Col span={22}>
                        <h1>This is the profile of {this.state.name} </h1>
                        <h2>Current Medications</h2>

                            <div classname="meds-table">
                                <Table dataSource={this.data_source} size="small" rowKey="_id">
                                    <Column title="Name" dataIndex="name" key="name" />
                                    <Column
                                        title="Condition"
                                        dataIndex="condition"
                                        key="condition"
                                    />
                                    <Column title="Dosage" dataIndex="dosage" />
                                    <Column title="Time" dataIndex="time" key="time" />
                                    <Column
                                        title="Amount Remaining"
                                        dataIndex="amount_remaining"
                                        key="amount_remaining"
                                    />

                                    {/* <Column
                                title=""
                                key="remove"
                                render={() => <Button type="danger">Remove</Button>}
                            /> */}

                                    <Column
                                        title=""
                                        key="update"
                                        render={() => <Button type="primary" onClick={this.fetchTableProps()}>Update</Button>}
                                    />
                                </Table>
                                <CollectionsPage profile={ this.state.id } />
                            </div>
                    </Col>
                </Row>
        );
    }
}
export default Profile;
