import "./Profile.css";

const Profile = (props) => {
  return (
    <section className="profile root__section">
      <div className="profile__user-info-container">
        <div className="profile__photo"></div>
        <div className="profile__data">
          <h1 className="profile__name">
            {props.data.name + " " + props.data.surname}
          </h1>
          <p className="profile__job">{props.data.job}</p>
          <button className="button profile__edit-button" onClick={props.togglerPopupEdit}>Edit</button>
        </div>
        <button className="button profile__add-button" onClick={props.togglerPopupAdd}>+</button>
      </div>
    </section>
  );
};

export default Profile;
