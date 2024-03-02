import React from "react";

export default function BrandItem({ item, fun }) {
  return (
    <>
      <div className="col-md-3">
        <div
          type="button"
          onClick={() => {
            fun(item._id);
          }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <div className="card product d-flex flex-column">
            <div className="card-body d-flex justify-content-center">
              <img src={item.image} alt={item.slug} className="w-100" />
            </div>
            <p className="card-text px-5 py-3 text-center">{item.name}</p>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body d-flex justify-content-between">
                <h3 className="fw-bolder text-main pt-5 text-center">
                  {item.name}
                </h3>
                <img src={item.image} alt={item.slug} className="w-100" />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
