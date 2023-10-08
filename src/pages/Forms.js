import React, { Component } from 'react';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      eventDate: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Добавлено новое событие:', this.state);
  
    this.setState({ eventName: '', eventDate: '' });
  }

  render() {
    return (
      <div>
        <h2>Форма для добавления события</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Название события:</label>
            <input
              type="text"
              name="eventName"
              value={this.state.eventName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Дата события:</label>
            <input
              type="date"
              name="eventDate"
              value={this.state.eventDate}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Добавить событие</button>
        </form>
      </div>
    );
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Добавлен комментарий:', this.state.commentText);

    this.setState({ commentText: '' });
  }

  render() {
    return (
      <div>
        <h2>Форма для добавления комментария</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Текст комментария:</label>
            <textarea
              name="commentText"
              value={this.state.commentText}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Добавить комментарий</button>
        </form>
      </div>
    );
  }
}

const Forms = () => {
  return (
    <div>
      <EventForm />
      <CommentForm />
    </div>
  );
}

export default Forms;
