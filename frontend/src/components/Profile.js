function Profile({
  userInfo,
  handleAvatarClick,
  handleProfileClick,
  handleAddCardClick,
}) {
  return (
    <section className="profile">
      <div className="profile__content">
        <div className="profile__avatar">
          <img
            src={userInfo.avatar}
            alt="аватар"
            className="profile__avatar-icon"
            onClick={handleAvatarClick}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userInfo.name}</h1>
          <button
            type="button"
            aria-label="edit"
            className="profile__edit-button"
            onClick={handleProfileClick}
          ></button>
          <p className="profile__subtitle">{userInfo.about}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="add"
        className="profile__add-button"
        onClick={handleAddCardClick}
      ></button>
    </section>
  );
}

export default Profile;
