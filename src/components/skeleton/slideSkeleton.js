import React, { Component } from 'react'
import './slideSkeleton.css'

class SlideSkeleton extends Component {
  render () {
    return (
      <div className="skeletonWrapper">
        <div className="skeleton-row">
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
        </div>
        <div className="skeleton-row">
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
        </div>
      </div>
    )
  }
}

export default SlideSkeleton