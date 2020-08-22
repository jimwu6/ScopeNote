// ALL CONTENT EDITABLE THINGS HERE
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ContentEditable from 'react-contenteditable'
import { Table, Button } from 'semantic-ui-react'
// import Collapsible from 'react-collapsible';
// import "./css/collapsible.css";


export default class SummaryList extends Component {
    initialState = {
        store: [
          { id: 1, point: "this is point1" },
          { id: 2, point: "this is point2" },
        ],
        row: {
          point: 'Add point here'
        },
      }
    
      state = this.initialState
      firstEditable = React.createRef()
    
      addRow = () => {
        const { store, row } = this.state
        // const trimSpaces = string => {
        //   return string
        //     .replace(/&nbsp;/g, '')
        //     .replace(/&amp;/g, '&')
        //     .replace(/&gt;/g, '>')
        //     .replace(/&lt;/g, '<')
        // }
        // const trimmedRow = {
        //   ...row,
        //   word: trimSpaces(row.word),
        // }
    
        row.id = store.length + 1
    
        this.setState({
          store: [...store],
          row: this.initialState.row,
        })
    
        this.firstEditable.current.focus()
      }
    
      deleteRow = id => {
        const { store } = this.state
    
        this.setState({
          store: store.filter(point => id !== point.id),
        })
      }
    
    //   disableNewlines = event => {
    //     const keyCode = event.keyCode || event.which
    
    //     if (keyCode === 13) {
    //       event.returnValue = false
    //       if (event.preventDefault) event.preventDefault()
    //     }
    //   }
    
    //   validateNumber = event => {
    //     const keyCode = event.keyCode || event.which
    //     const string = String.fromCharCode(keyCode)
    //     const regex = /[0-9,]|\./
    
    //     if (!regex.test(string)) {
    //       event.returnValue = false
    //       if (event.preventDefault) event.preventDefault()
    //     }
    //   }
    
      pasteAsPlainText = event => {
        event.preventDefault()
    
        const text = event.clipboardData.getData('text/plain')
        document.execCommand('insertHTML', false, text)
      }
    
      highlightAll = () => {
        setTimeout(() => {
          document.execCommand('selectAll', false, null)
        }, 0)
      }
    
      handleContentEditable = event => {
        const { row } = this.state
        const {
          currentTarget: {
            dataset: { column },
          },
          target: { value },
        } = event
    
        this.setState({ row: { ...row, [column]: value } })
      }
    
      handleContentEditableUpdate = event => {
        const { store } = this.state
    
        const {
          currentTarget: {
            dataset: { row, column },
          },
          target: { value },
        } = event
    
        let updatedRow = store.filter((point, i) => parseInt(i) === parseInt(row))[0]
        updatedRow[column] = value
    
        this.setState({
          store: store.map((point, i) => (point[column] === row ? updatedRow : point)),
        })
      }

    
      render() {
        const {
          store,
          row: { point },
        } = this.state
    
        return (
          <div className="App">
              <div>
                {store.map((row, i) => {
                  return (
                    <div key={row.id}>
                        
                            <ContentEditable
                            html={row.point}
                            data-column="point"
                            data-row={i}
                            className="content-editable"
                            //   onKeyPress={this.validateNumber}
                            onPaste={this.pasteAsPlainText}
                            onFocus={this.highlightAll}
                            onChange={this.handleContentEditableUpdate}
                            />



                            <Button
                            onClick={() => {
                                this.deleteRow(row.id)
                            }}
                            >
                            Delete
                            </Button>


                        {/* <ContentEditable
                          html={row.word}
                          data-column="word"
                          data-row={i}
                          className="content-editable"
                        //   onKeyPress={this.disableNewlines}
                          onPaste={this.pasteAsPlainText}
                          onFocus={this.highlightAll}
                          onChange={this.handleContentEditableUpdate}
                        /> */}
                    </div>
                  )
                })}
                <div className="addPoint">

                    <ContentEditable
                      html={point}
                      data-column="point"
                      className="content-editable"
                      innerRef={this.firstEditable}
                    //   onKeyPress={this.disableNewlines}
                      onPaste={this.pasteAsPlainText}
                      onFocus={this.highlightAll}
                      onChange={this.handleContentEditable}
                    />

                    <Button disabled={!point} onClick={this.addRow}>
                      Add
                    </Button>

                </div>
            </div>
          </div>
        )
      }
    }