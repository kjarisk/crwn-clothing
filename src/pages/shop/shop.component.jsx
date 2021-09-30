import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import { collection, onSnapshot, getDocs } from "firebase/firestore";

import CollectionsOverView from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.componets";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import {
  db,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import { updateCollections } from "../../redux/shop/shop.actions";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverView);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  unsubscribFromSnapshot = null;

  state = {
    loading: true,
  };

  async componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(db, "collections");

    // use oneoff
    // collectionRef.get().then(snapshot => {  // same as other, this cuts off the live streaming
    // use fetch, https://firebase.google.com/docs/firestore/use-rest-api#making_rest_calls  fetch(url).then().then();
    //onSnapshot(collectionRef, async (snapshot) => {
    await getDocs(collectionRef).then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={match.path}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
