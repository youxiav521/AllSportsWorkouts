#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import json

from sqlalchemy import func

from config import JSON_FILE, SQL_FILE
from generator import Generator
from generator.db import Activity


def list_sources(session):
    rows = (
        session.query(Activity.source, func.count(Activity.run_id))
        .group_by(Activity.source)
        .order_by(func.count(Activity.run_id).desc())
        .all()
    )
    return rows


def delete_by_source(session, source):
    # match case-insensitively, e.g. "keep" also matches "Keep"
    deleted = (
        session.query(Activity)
        .filter(func.lower(Activity.source) == source.lower())
        .delete(synchronize_session=False)
    )
    session.commit()
    return deleted


def regenerate_activities_json():
    generator = Generator(SQL_FILE)
    activities = generator.load()
    with open(JSON_FILE, "w") as f:
        json.dump(activities, f, indent=0)
    return len(activities)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Delete activities of one or more source(s) from data.db and "
        "regenerate src/static/activities.json."
    )
    parser.add_argument(
        "sources", nargs="*", help="source name(s) to delete, e.g. Keep xingzhe"
    )
    parser.add_argument(
        "-l", "--list", action="store_true", help="list current sources and exit"
    )
    parser.add_argument(
        "-y", "--yes", action="store_true", help="skip confirmation prompt"
    )
    parser.add_argument(
        "--no-regen",
        action="store_true",
        help="do not regenerate activities.json after deletion",
    )
    options = parser.parse_args()

    generator = Generator(SQL_FILE)
    session = generator.session

    if options.list:
        print("current sources in data.db:")
        for source, count in list_sources(session):
            print(f"  {source or '<null>'}: {count}")
        raise SystemExit(0)

    if not options.sources:
        parser.error("provide at least one source name, or use --list")

    for source in options.sources:
        count = (
            session.query(Activity)
            .filter(func.lower(Activity.source) == source.lower())
            .count()
        )
        if count == 0:
            print(f"no activities found for source '{source}', skip")
            continue

        if not options.yes:
            answer = input(
                f"delete {count} activities with source '{source}'? [y/N] "
            )
            if answer.strip().lower() not in ("y", "yes"):
                print(f"skipped source '{source}'")
                continue

        deleted = delete_by_source(session, source)
        print(f"deleted {deleted} activities with source '{source}'")

    if not options.no_regen:
        total = regenerate_activities_json()
        print(f"activities.json regenerated: {total} activities")
